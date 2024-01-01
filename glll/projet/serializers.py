from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.core.validators import MaxValueValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password


import re
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator
from rest_framework import serializers
from .models import *

from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator
from .models import Avocat



User = get_user_model()

class AvocatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avocat
        fields = ['specialite', 'Adresse', 'Numero_de_telephone', 'langue', 'image']

class registrationavocatSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    avocat = AvocatSerializer(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'avocat']

        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        password1 = data.get('password')
        password2 = data.get('password2')

        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError("Les mots de passe doivent correspondre.")

        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)
        avocat_data = validated_data.pop('avocat', None)

        # Create the User instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_avocat=True,
        )

        if avocat_data is not None:
            try:
                avocat = Avocat.objects.create(user=user, **avocat_data)
            except ValidationError as e:
                user.delete()
                raise serializers.ValidationError(str(e))
        else:
            avocat = None

        return avocat


class loginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError('Invalid email ')

            # Vérification du mot de passe
            if check_password(password, user.password):
                data['user'] = user
                data['is_client'] = user.is_client
                data['is_avocat'] = user.is_avocat
            else: 
                raise serializers.ValidationError('Invalid password')
        else:
            raise serializers.ValidationError('Email and password are required')

        return data




    
class registrationclientSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        password1 = data.get('password')
        password2 = data.get('password2')

        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError("Les mots de passe doivent correspondre.")

        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)

        # Create the User instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_client=True,
        )

        return user
    
class registrationadminSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        password1 = data.get('password')
        password2 = data.get('password2')

        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError("Les mots de passe doivent correspondre.")

        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)

        # Create the User instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_admin=True,
        )

        return user