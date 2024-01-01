from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_client = models.BooleanField(default=False)
    is_avocat = models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)
    def __str__(self):
        return self.username 


class Client(models.Model):
    user = models.OneToOneField('projet.User', on_delete=models.CASCADE, primary_key=True)  # Change 1 to a valid user ID
   

    def __str__(self):
        return f"Cleint: {self.user.username}"

class Avocat(models.Model):
    user = models.OneToOneField('projet.User', on_delete=models.CASCADE, primary_key=True)
    specialite = models.CharField(max_length=255, blank=True, null=True)
    langue = models.CharField(max_length=255, blank=True, null=True)
    Numero_de_telephone = models.IntegerField(blank=True, null=True)
    Adresse = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return f"Avocat: {self.user.username}"
    
class Admin(models.Model):
    user = models.OneToOneField('projet.User', on_delete=models.CASCADE, primary_key=True)  # Change 1 to a valid user ID
    def __str__(self):
        return f"Admin: {self.user.username}"

