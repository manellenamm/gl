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
from django.db.models import Avg
from rest_framework.decorators import action




class registrationavocatView(viewsets.ModelViewSet):
    serializer_class = registrationavocatSerializer
    queryset = Avocat.objects.all()  # Assurez-vous de définir votre propre queryset

    @action(detail=False, methods=['post'])
    def register_avocat(self, request, *args, **kwargs):
        serializer = registrationavocatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


    

from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore

class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})

        if serializer.is_valid():
            user = serializer.validated_data.get('user')

            if user:
                # Créez manuellement une session pour l'utilisateur
                session = SessionStore()
                session.create()
                session['user_id'] = user.pk
                session.save()

                # Redirection en fonction du type d'utilisateur
                if isinstance(user, Client):
                    return Response({'redirect_url': '/UserProfile/'})
                elif isinstance(user, Avocat):
                    return Response({'redirect_url': '/LawyerPage/'}) 
                elif isinstance(user, Admin):
                    return Response({'message': 'Login successful! Redirect to admin page.'})
            else:
                return Response({'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


from rest_framework import generics
from django.db.models import Q
from datetime import datetime, timedelta
from django.db.models import Subquery, OuterRef , Exists


from django.utils import timezone


class AvailableDatesView(generics.ListAPIView):
    serializer_class = AvailableDatesSerializer

    def get_queryset(self):
        avocat_email = self.kwargs.get('avocat_email')  # Assurez-vous de passer l'email de l'avocat dans l'URL

        # Dates prises par l'avocat dans la table Appointment
        avocat_appointments = Appointment.objects.filter(avocat__email=avocat_email, status=True)
        taken_dates_appointment = avocat_appointments.values_list('creneau__date', flat=True)

        # Dates prises par l'avocat dans la table Creneau
        taken_dates_creneau = Creneau.objects.filter(
            id_creneau__in=avocat_appointments.values_list('creneau__id_creneau', flat=True)
        ).values_list('date', flat=True)

        # Fusionner les deux listes de dates prises
        taken_dates = list(taken_dates_appointment) + list(taken_dates_creneau)

        # Filtrer les dates disponibles pour le mois actuel
        today = datetime.now()
        start_date = today.replace(day=1)
        end_date = (start_date + timedelta(days=32)).replace(day=1) - timedelta(days=1)

        # Exclure les dates prises
        existing_dates = Creneau.objects.filter(
            date__range=[start_date, end_date]
        ).exclude(date_time__in=taken_dates)

        return existing_dates
    


from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Appointment, Avocat, Client
from .serializers import AppointmentSerializer
from rest_framework import views, status

class AppointmentCreateView(APIView):
    def post(self, request, avocat_email, *args, **kwargs):
        data = request.data.copy()
        data['avocat_email'] = avocat_email  # Ajouter l'e-mail de l'avocat dans les données

        # Supprimez la référence explicite à 'request' dans le contexte
        serializer = AppointmentSerializer(data=data, context={'avocat_email': avocat_email})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AvocatAppointmentsView(APIView):
     def get(self, request, avocat_email, *args, **kwargs):
        # Récupérer l'avocat à partir de l'e-mail ou renvoyer une 404 si l'avocat n'existe pas
        avocat = get_object_or_404(Avocat, email=avocat_email)
        print(f"avocat_email: {avocat_email}")
        print(f"Avocat: {avocat}")

        # Récupérer tous les rendez-vous associés à cet avocat avec le statut 'attente'
        appointments = avocat.avocat_appointments.all()
        print(f"Number of appointments: {len(appointments)}")
        print(f"Appointments: {appointments}")

        # Serializer les rendez-vous
        serializer = AvocatAppointmentSerializer(appointments, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
from django.http import Http404

class AcceptAppointmentView(APIView):
    def put(self, request, avocat_email, id, *args, **kwargs):
        try:
            # Récupérer l'avocat à partir de l'e-mail ou renvoyer une 404 si l'avocat n'existe pas
            avocat = get_object_or_404(Avocat, email=avocat_email)

            # Récupérer l'appointment associé à cet avocat
            appointment = get_object_or_404(Appointment, id_appointment=id, avocat=avocat , status='en_attente')

            # Mettre à jour le statut de l'appointment à 'accepte'
            appointment.status = 'accepte'
            appointment.save()
            client_email = appointment.client.email
           
            subject = "Rendez-vous Accepte"
            message = 'appointment_Accepted'
            from_email = "aissoumanel009@gmail.com"  # Set your email address here
            send_mail(subject, 
                      message ,
                      from_email,
                      [client_email] ,
                       fail_silently=False)

            # Serializer l'appointment mis à jour
            serializer = AvocatAppointmentSerializer(appointment)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Http404:
            return Response({'error': 'Appointment not found.'}, status=status.HTTP_404_NOT_FOUND)

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class RefuseAppointmentView(APIView):
    def delete(self, request, avocat_email, id, *args, **kwargs):
        try:
            # Récupérer l'avocat à partir de l'e-mail ou renvoyer une 404 si l'avocat n'existe pas
            avocat = Avocat.objects.get(email=avocat_email)

            # Récupérer l'appointment associé à cet avocat avec le statut 'attente'
            appointment = Appointment.objects.get(id_appointment=id, avocat=avocat, status='en_attente')

            # Récupérer le créneau associé à l'appointment
            creneau = appointment.creneau

            # Supprimer le créneau associé
            creneau.delete()

            # Supprimer l'appointment
            appointment.delete()
             # Envoyer un message au client
            client_email = appointment.client.email
           
            subject = "Rendez-vous Refusé"
            message = 'appointment_refused'
            from_email = "aissoumanel009@gmail.com"  # Set your email address here
            send_mail(subject, 
                      message ,
                      from_email,
                      [client_email] ,
                       fail_silently=False)

            # Serializer l'appointment mis à jour
            serializer = AvocatAppointmentSerializer(appointment)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Appointment.DoesNotExist:
            return Response({'error': 'Appointment not found.'}, status=status.HTTP_404_NOT_FOUND)

        except Http404:
            return Response({'error': 'Avocat not found.'}, status=status.HTTP_404_NOT_FOUND)
        

        
    

class RatingCreateView(APIView):
    def post(self, request, *args, **kwargs):
        # Utiliser request.user pour récupérer l'utilisateur connecté
        client_email = request.data.get('client_email')
        # Récupérer les données de la requête
        avocat_email = request.data.get('avocat_email')
        note = request.data.get('note')

        try:
            # Récupérer le client à partir de l'utilisateur
            client = Client.objects.get(email=client_email)
            # Récupérer l'avocat à partir de l'e-mail fourni dans la requête
            avocat = Avocat.objects.get(email=avocat_email)
        except (Client.DoesNotExist, Avocat.DoesNotExist):
            return Response({'error': 'Client or Avocat not found'}, status=status.HTTP_404_NOT_FOUND)

        # Créer les données pour le modèle Rating
        rating_data = {'client': client.id, 'avocat': avocat.avocat_id, 'note': note}
        serializer = RatingSerializer(data=rating_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
class AvocatRatingView(APIView):
    def get(self, request, *args, **kwargs):
        avocat_email = kwargs.get('avocat_email', None)

        if avocat_email is not None:
            try:
                avocat = Avocat.objects.get(email=avocat_email)
            except Avocat.DoesNotExist:
                return Response({'error': 'Avocat not found'}, status=status.HTTP_404_NOT_FOUND)

            avg_rating = Rating.objects.filter(avocat=avocat).aggregate(Avg('note'))['note__avg'] or 0.0

            response_data = {
                'avocat_username': avocat.username,
                'avg_rating': avg_rating
            }

            return Response(response_data, status=status.HTTP_200_OK)

        return Response({'error': 'Missing avocat_email parameter'}, status=status.HTTP_400_BAD_REQUEST)
    
from rest_framework import generics, permissions
from django.core.exceptions import PermissionDenied


class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

def perform_create(self, serializer):
    client_email = self.request.data.get('client_email')
    client = get_object_or_404(Client, email=client_email)

    avocat_id = self.request.data.get('avocat')
    avocat = get_object_or_404(Avocat, pk=avocat_id)

    try:
        serializer.save(client=client, avocat=avocat)
    except Exception as e:
        print(f"Error saving comment: {e}")


class AvocatCommentsView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        avocat_id = self.kwargs['avocat_id']
        avocat = get_object_or_404(Avocat, pk=avocat_id)
        return Comment.objects.filter(avocat=avocat)
    


from urllib.parse import urlencode
from rest_framework import serializers
from rest_framework.views import APIView
from django.shortcuts import redirect
from rest_framework.response import Response
from django.urls import reverse  # Ajoutez cette ligne pour utiliser reverse
from .mixins import PublicApiMixin, ApiErrorsMixin
from .utils import google_get_access_token, google_get_user_info, generate_tokens_for_user
from .models import Client  # Assurez-vous que c'est correctement importé
from rest_framework import status
from .serializers import ClientSerializer  # Assurez-vous que c'est correctement importé
from django.conf import settings

class GoogleLoginApi(PublicApiMixin, ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')

        login_url = f'{settings.BASE_FRONTEND_URL}'
    
        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')

        redirect_uri = f'{settings.BASE_FRONTEND_URL}/google'
        access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)

        try:
            user = Client.objects.get(email=user_data['email'])
        except Client.DoesNotExist:
            username = user_data.get('given_name', '')
          

            user =Client.objects.create(
                email=user_data['email'],
                username=username,
            )
            
        access_token, refresh_token = generate_tokens_for_user(user)
        response_data = {
            'user': ClientSerializer(user).data,
            'access_token': str(access_token),
            'refresh_token': str(refresh_token)
        }

        return Response(response_data, status=status.HTTP_200_OK)
    

class GoogleLoginAdmin(PublicApiMixin, ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')

        login_url = f'{settings.BASE_FRONTEND_URL}'
    
        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')

        redirect_uri = f'{settings.BASE_FRONTEND_URL}/googlle'
        access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)

        try:
            user = Admin.objects.get(email=user_data['email'])
        except Admin.DoesNotExist:
            username = user_data.get('given_name', '')
          

            user =Admin.objects.create(
                email=user_data['email'],
                username=username,
            )
            
        access_token, refresh_token = generate_tokens_for_user(user)
        response_data = {
            'user': AdminSerializer(user).data,
            'access_token': str(access_token),
            'refresh_token': str(refresh_token)
        }

        return Response(response_data, status=status.HTTP_200_OK)
    
class GetAvocatDataView(APIView):
    def post(self, request, *args, **kwargs):
        avocat_email = request.data.get('email', '')

        if not avocat_email:
            return Response({"error": "Email not provided in the request"}, status=400)

        try:
            # Votre logique d'authentification personnalisée ici
            avocat = Avocat.objects.get(email=avocat_email)

            # Votre logique de validation d'authentification ici

            serializer = AvocatSerializer(avocat)
            return Response({ "avocatData": serializer.data})
        except Avocat.DoesNotExist:
            return Response({"error": "Avocat not found for the provided email"}, status=404)
        
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def update_avocat(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            avocat_id = data.get('avocat_Id')
            avocat = Avocat.objects.get(id=avocat_id)

            # Mettez à jour les champs de l'avocat
            avocat.username = data.get('name', avocat.username)
            avocat.email = data.get('email', avocat.email)
            avocat.langue = data.get('langue', avocat.langue)
            avocat.specialite = data.get('specialite', avocat.specialite)
            avocat.Numero_de_telephone = data.get('Numero_de_telephone', avocat.Numero_de_telephone)
            avocat.Adresse = data.get('Adresse', avocat.Adresse)
            avocat.image = data.get('image', avocat.image)

            avocat.save()

            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    


class LawyerList(generics.ListAPIView):
    queryset = Avocat.objects.all()
    serializer_class = AvocatSerializer

class LawyerDetail(generics.RetrieveDestroyAPIView):
    queryset = Avocat.objects.all()
    serializer_class = AvocatSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)