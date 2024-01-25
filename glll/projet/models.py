from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Avocat(models.Model):
    avocat_id = models.AutoField(primary_key=True , default=None)
    username = models.CharField(max_length=255)
    specialite = models.CharField(max_length=255, blank=True, null=True)
    langue = models.CharField(max_length=255, blank=True, null=True)
    Numero_de_telephone = models.IntegerField(blank=True, null=True)
    Adresse = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    password_avocat = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True, default='some_default_value')

    def __str__(self):
        return f"Avocat: {self.avocat_id}"

from django.db import models

class Admin(models.Model):
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    email = models.CharField(max_length=50, unique= True ,blank=True, null=True, default='some_default_value')
    

    def __str__(self):
        return self.username or self.email
    

class Client(models.Model):
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    email = models.CharField(max_length=50, unique=True , blank=True, null=True, default='some_default_value')
 

    def __str__(self):
        return self.username or self.email
    



class Creneau(models.Model):
    id_creneau=models.AutoField(primary_key=True,  default=None)
    date =  models.DateField(blank=True, null=True)
    HOURS_CHOICES = [
        ('8:00', '8:00'),
        ('9:00', '9:00'),
        ('10:00', '10:00'),
        ('11:00', '11:00'),
        ('13:00', '13:00'),
        ('14:00', '14:00'),
        ('15:00', '15:00'),
    ]
    time = models.CharField(max_length=5, choices=HOURS_CHOICES , blank=True, null=True)
   

    def __str__(self):
        return f"Creneau at {self.date}"


class Rating(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    avocat = models.ForeignKey(Avocat, on_delete=models.CASCADE)
    note = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    def __str__(self):
        return f"Rating: {self.client} -> {self.avocat} ({self.note})"

    class Meta:
        unique_together = ('client', 'avocat')

class Appointment(models.Model):
    id_appointment = models.AutoField(primary_key=True, default=None)

    STATUS_CHOICES = [
        ('en_attente', 'En attente'),
        ('accepte', 'Accepté'),
        ('refuse', 'Refusé'),
    ]

    client = models.ForeignKey(Client, related_name='client_appointments', on_delete=models.CASCADE)
    avocat = models.ForeignKey(Avocat, related_name='avocat_appointments', on_delete=models.CASCADE)
    creneau = models.ForeignKey(Creneau, related_name='creneau_appointments', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='en_attente')

    def __str__(self):
        return f"Appointment {self.id_appointment} with {self.avocat} at {self.creneau.id_creneau} by {self.client}"



class Comment(models.Model):
    avocat = models.ForeignKey('Avocat', related_name='avocat_comments', on_delete=models.CASCADE)
    client = models.ForeignKey('Client', related_name='client_comments', on_delete=models.CASCADE)
    avis = models.TextField()

    def __str__(self):
        return f'Comment from {self.client} to {self.avocat} '