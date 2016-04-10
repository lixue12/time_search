#coding=utf8
__author__ = 'defaultstr'
from anno.models import *
from django.db import transaction, models
import urllib
import re


patterns = {key: re.compile('%s=(.*?)\\t' % key) for key in ['TIMESTAMP', 'USER', 'TASK', 'ACTION']}
info_patterns = re.compile('INFO:\\t(.*?)$')
anno_info_patterns = {}
anno_info_patterns['time'] = re.compile('time=(.*?)$')


def fromString(line):
    studentID = patterns['USER'].search(line).group(1)
    task_id = patterns['TASK'].search(line).group(1)
    #action = patterns['ACTION'].search(line).group(1)
    #time = patterns['RANGE'].search(line).group(1)
    anno_log_obj = Time1.objects.create(studentID=studentID,
                                task_id=task_id,
                                content=line)
    print anno_log_obj
    return anno_log_obj


@transaction.atomic
def insertMessageToDB(message):
    try:
        for line in message.split('\n'):
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
