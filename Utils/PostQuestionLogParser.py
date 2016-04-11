#coding=utf8
__author__ = 'defaultstr'
from anno.models import *
from django.db import transaction, models
import urllib
import re


patterns = {key: re.compile('%s=(.*?)\\t' % key) for key in ['TIMESTAMP', 'USER', 'TASK', 'QUALITY', 'DIFFICULT', 'FEELTIME', 'PRESSURE']}


def fromString(line):
    studentID = patterns['USER'].search(line).group(1)
    task_id = patterns['TASK'].search(line).group(1)
    quality = patterns['QUALITY'].search(line).group(1)
    difficult = patterns['DIFFICULT'].search(line).group(1)
    feeltime = patterns['FEELTIME'].search(line).group(1)
    pressure = patterns['PRESSURE'].search(line).group(1)
    #task_id = patterns['TASK'].search(line).group(1)
    #action = patterns['ACTION'].search(line).group(1)
    #time = patterns['RANGE'].search(line).group(1)
    anno_log_obj = Postquestion.objects.create(studentID=studentID,
                                              task_id=task_id,
                                              quality=quality,
                                              difficult=difficult,
                                              feeltime=feeltime,
                                              pressure=pressure,
                                              content=line)
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
