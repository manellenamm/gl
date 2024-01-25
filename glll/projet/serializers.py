from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.core.validators import MaxValueValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password


import re
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator
from rest_framework import serializers
from .models import *

from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator
from .models import Avocat


class AvocatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avocat
        fields = ['username', 'specialite', 'Adresse', 'Numero_de_telephone', 'langue', 'image', 'password_avocat', 'email']

class registrationavocatSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Avocat
        fields = ['username', 'specialite', 'Adresse', 'Numero_de_telephone', 'langue', 'image', 'password_avocat', 'password2' , 'email']
        extra_kwargs = {
            'password_avocat': {'write_only': True},
        }

    def validate(self, data):
        password1 = data.get('password_avocat')
        password2 = data.get('password2')

        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError("Les mots de passe doivent correspondre.")

        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)

        # Hash the password before saving
        validated_data['password_avocat'] = make_password(validated_data['password_avocat'])

        avocat = Avocat.objects.create(
            username=validated_data['username'],
            specialite=validated_data.get('specialite'),
            Adresse=validated_data.get('Adresse'),
            Numero_de_telephone=validated_data.get('Numero_de_telephone'),
            langue=validated_data.get('langue'),
            image=validated_data.get('image'),
            password_avocat=validated_data['password_avocat'],
            email=validated_data['email'],
        )

        return avocat

class ClientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Client
        fields = ['username', 'email']


class AdminSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Client
        fields = ['username', 'email']


    

from django.contrib.auth.hashers import check_password
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = self.authenticate_user(email, password)

            if user:
                data['user'] = user
            else:
                raise serializers.ValidationError('Invalid email or password')
        else:
            raise serializers.ValidationError('Email and password are required')

        return data

    def authenticate_user(self, email, password):
        try:
            # Essayez de récupérer le client par email
            client = Client.objects.get(email=email)
            # Vérifiez le mot de passe
            if check_password(password, client.password_client):
                return client
        except Client.DoesNotExist:
            pass

        try:
            # Essayez de récupérer l'avocat par email
            avocat = Avocat.objects.get(email=email)
            # Vérifiez le mot de passe
            if check_password(password, avocat.password_avocat):
                return avocat
        except Avocat.DoesNotExist:
            pass


        try:
            # Essayez de récupérer l'admin par email
            admin = Admin.objects.get(email=email)
            # Vérifiez le mot de passe
            if admin.password_admin == password:
                return admin
        except Admin.DoesNotExist:
            pass

        return None
    




class AvailableDatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creneau
        fields = ['id_creneau', 'date_time']


from django.shortcuts import get_object_or_404

from rest_framework import serializers
from .models import Appointment, Avocat, Client


class CreneauSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creneau  
        fields = ['date', 'time']

class AppointmentSerializer(serializers.ModelSerializer):
    client_email = serializers.EmailField(write_only=True)
    creneau = CreneauSerializer(write_only=True)

    class Meta:
        model = Appointment
        fields = ['client_email', 'creneau', 'status']

    def validate_creneau(self, value):
        # Assurez-vous que l'heure est dans l'ensemble spécifié
        allowed_hours = ['8:00', '9:00', '10:00', '11:00', '13:00', '14:00', '15:00']
        if str(value['time']) not in allowed_hours:
            raise serializers.ValidationError('Invalid time selected.')
        
        return value

    def create(self, validated_data):
        avocat_email = self.context.get('avocat_email')
        avocat = get_object_or_404(Avocat, email=avocat_email)

        client_email = validated_data.pop('client_email')
        client = Client.objects.filter(email=client_email).first()

        if not client:
            raise serializers.ValidationError({'client_email': 'Client not found.'})

        creneau_data = validated_data.pop('creneau')
        date = creneau_data['date']
        time = creneau_data['time']

        # Vérifier si la date est déjà dans la table Creneau
        existing_creneau = Creneau.objects.filter(date=date, time=time).first()

        if existing_creneau:
            raise serializers.ValidationError({'creneau': 'Date and time already taken.'})

        # Si la date n'est pas déjà dans la table Creneau et l'heure est valide, la créer
        creneau = Creneau.objects.create(
            date=date,
            time=time
        )

        appointment = Appointment.objects.create(
            client=client,
            avocat=avocat,
            creneau=creneau,
        )

        return appointment


class AvocatAppointmentSerializer(serializers.ModelSerializer):
    client = serializers.StringRelatedField()
    creneau = serializers.StringRelatedField()

    class Meta:
        model = Appointment
        fields = ['id_appointment', 'client','avocat','creneau', 'status']


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['client', 'avocat', 'note']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['avocat', 'client', 'avis']