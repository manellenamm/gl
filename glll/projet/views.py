from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from projet.serializers import *
from rest_framework.viewsets import ModelViewSet
from .models import Avocat
from rest_framework import viewsets
from django.contrib.auth import  login, logout 
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password



User = get_user_model()

class registrationavocatView(viewsets.ModelViewSet):
    serializer_class = registrationavocatSerializer
    queryset = User.objects.all()  # Assurez-vous de définir votre propre queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response({'message': 'Registration successful!'}, status=status.HTTP_201_CREATED, headers=headers)
    

class registrationclientView(viewsets.ModelViewSet):
    serializer_class = registrationclientSerializer
    queryset = User.objects.all()  # Assurez-vous de définir votre propre queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response({'message': 'Registration successful!'}, status=status.HTTP_201_CREATED, headers=headers)
    

class registrationadminView(viewsets.ModelViewSet):
    serializer_class = registrationadminSerializer
    queryset = User.objects.all()  # Assurez-vous de définir votre propre queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response({'message': 'Registration successful!'}, status=status.HTTP_201_CREATED, headers=headers)
    


   

class RechercheAvocatAPIView(viewsets.ViewSet):
    serializer_class = AvocatSerializer  # Utilisez AvocatSerializer ici

    def list(self, request, *args, **kwargs):
        queryset = Avocat.objects.all()

        # Filtrage par spécialité
        specialite = self.request.query_params.get('specialite')
        if specialite:
            queryset = queryset.filter(specialite__icontains=specialite)

        # Filtrage par langue
        langue = self.request.query_params.get('langue')
        if langue:
            queryset = queryset.filter(langue__icontains=langue)

        # Filtrage par Ville
        adresse = self.request.query_params.get('Adresse')
        if adresse:
            queryset = queryset.filter(Adresse__icontains=adresse)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    


    
class LoginView(APIView):
    serializer_class = loginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data.get('user')

            if user:
                # Log in the user
                login(request, user)

                # Retourner des informations JSON
                return Response({'message': 'Login successful!', 'is_avocat': user.is_avocat, 'is_client': user.is_client , 'is_admin': user.is_admin})
            else:
                return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


    

from django.shortcuts import render, redirect
from django.contrib.auth import logout

def home (request) :
    return render (request, "home.html")

def Logout_view (request) :
    logout(request)
    return redirect ("/")

