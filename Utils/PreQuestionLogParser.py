#coding=utf8
__author__ = 'defaultstr'
from anno.models import *
from django.db import transaction, models
import urllib
import re


patterns = {key: re.compile('%s=(.*?)\\t' % key) for key in ['TIMESTAMP', 'USER', 'TASK', 'FAMILIAR', 'INTEREST', 'DIFFICULT', 'UNDERSTAND']}


def fromString(line):
    studentID = patterns['USER'].search(line).group(1)
    task_id = patterns['TASK'].search(line).group(1)
    familiar = patterns['FAMILIAR'].search(line).group(1)
    interest = patterns['INTEREST'].search(line).group(1)
    difficult = patterns['DIFFICULT'].search(line).group(1)
    understand = patterns['UNDERSTAND'].search(line).group(1)
    #task_id = patterns['TASK'].search(line).group(1)
    #action = patterns['ACTION'].search(line).group(1)
    #time = patterns['RANGE'].search(line).group(1)
    anno_log_obj = Prequestion.objects.create(studentID=studentID,
                                              task_id=task_id,
                                              familiar=familiar,
                                              interest=interest,
                                              difficult=difficult,
                                              understand=understand)
    print anno_log_obj
    return anno_log_obj

@transaction.atomic
def insertMessageToDB(message):
    try:
        for line in message.split('\n'):
            print line
            if line == '':
                continue
            log = fromString(line)
            log.save()
    except Exception, e:
        print str(e)
        print 'insert exception'
        transaction.rollback()
    else:
        print "commit success!"
#transaction.atomic()
