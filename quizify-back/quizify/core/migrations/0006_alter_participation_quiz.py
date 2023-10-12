# Generated by Django 4.2.5 on 2023-10-04 11:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_quiz_participants_participation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participation',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participants', to='core.quiz'),
        ),
    ]