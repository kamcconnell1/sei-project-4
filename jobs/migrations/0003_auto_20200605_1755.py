# Generated by Django 3.0.7 on 2020-06-05 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_job_last_modified'),
    ]

    operations = [
        migrations.RenameField(
            model_name='job',
            old_name='deadline',
            new_name='application_deadline',
        ),
        migrations.AddField(
            model_name='job',
            name='application_submitted',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='interview_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='job_offer_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='offer_acceptance_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]