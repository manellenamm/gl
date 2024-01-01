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
from projet.models import User
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
router = routers.SimpleRouter()
router.register('registeravocat', registrationavocatView, basename='registeravocat' )
router.register('registerclient', registrationclientView, basename='registerclient' )
router.register('registeravocat', registrationavocatView, basename='registeravocat' )
router.register('registeradmin', registrationadminView, basename='registeradmin' )

router.register('recherche', RechercheAvocatAPIView, basename='recherche' )



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'), 
    path('',include("projet.urls")) ,
    path('accounts/',include("allauth.urls")) ,
    path('accountss/', include('allauth.socialaccount.urls')),
    
    

    

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)