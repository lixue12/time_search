# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('anno', '0003_setting'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='QuestionnaireAnswer',
            new_name='Outcome',
        ),
    ]
