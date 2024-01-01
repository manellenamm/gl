from django.utils.html import format_html
from django.contrib import admin
from .models import *

class AvocatInline(admin.StackedInline):
    model = Avocat
    can_delete = False
    verbose_name_plural = 'Avocat'  # Ajoutez cette ligne pour résoudre l'erreur

class UserAdmin(admin.ModelAdmin):
    inlines = (AvocatInline,)
    list_display = ('username', 'email', 'is_client', 'is_avocat', 'avocat_adresse', 'avocat_numero_de_telephone', 'avocat_langue', 'image_display')

    def avocat_adresse(self, obj):
        return obj.avocat.Adresse if obj.avocat else ''

    avocat_adresse.short_description = 'Adresse'

    def avocat_numero_de_telephone(self, obj):
        return obj.avocat.Numero_de_telephone if obj.avocat else None

    avocat_numero_de_telephone.short_description = 'Numéro de téléphone'

    def avocat_langue(self, obj):
        return obj.avocat.langue if obj.avocat else ''

    avocat_langue.short_description = 'Langue'

    def image_display(self, obj):
        return format_html('<img src="{}" style="height: 50px; width: 50px; object-fit: cover;" />', obj.avocat.image.url) if obj.avocat and obj.avocat.image else ''

    image_display.short_description = 'Image'

admin.site.register(User, UserAdmin)
admin.site.register(Avocat)
admin.site.register(Client)
admin.site.register(Admin)
