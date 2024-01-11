from django.utils.html import format_html
from django.contrib import admin
from .models import *

admin.site.register(Avocat)
admin.site.register(Admin)
admin.site.register(Client)
admin.site.register(Appointment)
admin.site.register(Creneau)
admin.site.register(Rating)
admin.site.register(Comment)