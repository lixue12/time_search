from django.conf.urls import patterns, include, url
from django.contrib import admin

from anno.views import search
from anno.views import pairsearch
from anno.views import login
from anno.views import log
from anno.views import log_prequestion
from anno.views import log_postquestion
from anno.views import tasks
from anno.views import annotation
from anno.views import log_annotation
from anno.views import log_session_annotation
from anno.views import log_outcome
from anno.views import pairtasks
from anno.views import pairs
from anno.views import pair_pre_question
from anno.views import pre_questionnaire
from anno.views import post_questionnaire
from anno.views import questionnaire
from anno.views import log_query_satisfaction
from anno.views import description

from anno.views import *

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'timesearch.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # url(r'^admin/', include(admin.site.urls)),
    (r'^search/(\d{1,2})/(.*?)/(.*?)/(.*?)/(\d{1,2})/$',search),
    (r'^pairsearch/(\d{1,2})/(.*?)/(.*?)/(.*?)/(\d{1,2})/$',pairsearch),
    (r'^login/$',login),
    (r'^tasks/(\d{10})/(.*?)/$',tasks),
    (r'^pairs/(\d{1,2})/(.*?)/$',pairs),
    (r'^pairtasks/(\d{10})/(.*?)/$',pairtasks),
    (r'^pre_questionnaire/(\d{1,2})/(\d{1,2})/$',pre_questionnaire),
    (r'^pair_pre_question/(\d{1,2})/(\d{1,2})/$',pair_pre_question),
    (r'^post_questionnaire/(\d{1,2})/$',post_questionnaire),
    (r'^annotation/(\d{1,2})/$', annotation),
    (r'^taskreview/(\d{1,2})/$', taskreview),
    (r'^LogService/$', log),
    (r'^PreQuestionService/$', log_prequestion),
    (r'^PostQuestionService/$', log_postquestion),
    (r'^AnnoService/$', log_annotation),
    (r'^SessionAnnoService/$', log_session_annotation),
    (r'^OutcomeService/$', log_outcome),
    (r'^TimeEstService/$', log_timeest),
    (r'^QuerySatisfactionService/$', log_query_satisfaction)
)
