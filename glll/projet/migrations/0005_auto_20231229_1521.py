# Generated by Django 3.2.10 on 2023-12-29 14:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projet', '0004_auto_20231229_1446'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='avocat',
            name='First_name',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='Last_name',
        ),
        migrations.AlterField(
            model_name='admin',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='client',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
