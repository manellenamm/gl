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
router.register('recherche', RechercheAvocatAPIView, basename='recherche' )


from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Your API",
        default_version='v1',
        description="Your API description",
        terms_of_service="https://www.yourapp.com/terms/",
        contact=openapi.Contact(email="contact@yourapp.com"),
        license=openapi.License(name="Your License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'), 
     path('available-dates/<str:avocat_email>/', AvailableDatesView.as_view(), name='available-dates'),
    path('avocat-appointments/<str:avocat_email>/', AvocatAppointmentsView.as_view(), name='avocat-appointments'),
    path('appointments/<int:avocat_id>/<int:client_id>/', AppointmentCreateView.as_view(), name='create-appointment'),
    path('accept-appointment/<str:avocat_email>/<int:id>/', AcceptAppointmentView.as_view(), name='accept-appointment'),
    path('api/ratings/create/<int:client_id>/<int:avocat_id>/', RatingCreateView.as_view(), name='create-rating'),
    path('avocat-rating/<str:avocat_email>/', AvocatRatingView.as_view(), name='avocat-rating'),
    path('refuse-appointment/<str:avocat_email>/<int:id>/', RefuseAppointmentView.as_view(), name='refuse-appointment'),
    path('api/comments/create/<int:avocat_id>/<int:client_id>/', CommentCreateView, name='comment-create'),
    path('avocat-comments/<int:avocat_id>/', AvocatCommentsView.as_view(), name='avocat-comments'),
    path("api/auth/google/", GoogleLoginApi.as_view(), name="login-with-google"),
    path("api/auth/googlle/", GoogleLoginAdmin.as_view(), name="login$"),
    path("api/get-avocat-data/", GetAvocatDataView.as_view(), name="getavocat"),
    path("api/update-avocat/", GetAvocatDataView.as_view(), name="getavocat"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('lawyers/', LawyerList.as_view(), name='lawyer-list'),
    path('lawyers/<int:pk>/', LawyerDetail.as_view(), name='lawyer-detail'),


    
    
    


    

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




