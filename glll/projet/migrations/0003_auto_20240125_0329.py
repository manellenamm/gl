# Generated by Django 3.2.5 on 2024-01-25 02:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projet', '0002_auto_20240125_0110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admin',
            name='email',
            field=models.CharField(blank=True, default='some_default_value', max_length=50, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='client',
            name='email',
            field=models.CharField(blank=True, default='some_default_value', max_length=50, null=True, unique=True),
        ),
    ]
