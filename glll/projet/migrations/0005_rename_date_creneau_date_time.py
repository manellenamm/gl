# Generated by Django 3.2.5 on 2024-01-26 12:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projet', '0004_auto_20240125_0337'),
    ]

    operations = [
        migrations.RenameField(
            model_name='creneau',
            old_name='date',
            new_name='date_time',
        ),
    ]
