"""glll URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from projet.views import *
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from django.urls import re_path
router = routers.SimpleRouter()
router.register('registeravocat', registrationavocatView, basename='registeravocat' )
router.register('registerclient', registrationclientView, basename='registerclient' )
router.register('recherche', RechercheAvocatAPIView, basename='recherche' )




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'), 
     path('available-dates/<str:avocat_email>/', AvailableDatesView.as_view(), name='available-dates'),
    path('avocat-appointments/<str:avocat_email>/', AvocatAppointmentsView.as_view(), name='avocat-appointments'),
    path('appointments/<str:avocat_email>/', AppointmentCreateView.as_view(), name='create-appointment'),
    path('accept-appointment/<str:avocat_email>/<int:id>/', AcceptAppointmentView.as_view(), name='accept-appointment'),
    path('create-rating/', RatingCreateView.as_view(), name='create-rating'),
    path('avocat-rating/<str:avocat_email>/', AvocatRatingView.as_view(), name='avocat-rating'),
    path('refuse-appointment/<str:avocat_email>/<int:id>/', RefuseAppointmentView.as_view(), name='refuse-appointment'),
    path('create-comment/', CommentCreateView.as_view(), name='create-comment'),
    path('avocat-comments/<int:avocat_id>/', AvocatCommentsView.as_view(), name='avocat-comments'),
    
    

    
    

    

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)