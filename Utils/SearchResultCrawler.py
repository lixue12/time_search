#coding=utf8
__author__ = 'luocheng'

import urllib
import urllib2

import datetime
class SearchResultCrawler:
    def __init__(self):
        pass
    def crawl(self,query,index=1):
        url ='http://www.sogou.com/web?query='+urllib.quote(query.encode('utf8'))+'&num=50&page='+str(index)+'&ie=utf8'
        # print url
        try:
            webpage = urllib2.urlopen(url,timeout=20).read()
            return webpage

        except Exception, e:
            print e
            return ''


if __name__ == '__main__':
    src = SearchResultCrawler()
    '''
    open('../temp/webpage21.html','w').write(src.crawl(u'俄罗斯族婚礼习俗',1))
    open('../temp/webpage22.html','w').write(src.crawl(u'俄罗斯族婚礼习俗',2))
    open('../temp/webpage31.html','w').write(src.crawl(u'节食减肥方法危害',1))
    open('../temp/webpage32.html','w').write(src.crawl(u'节食减肥方法危害',2))
    open('../temp/webpage41.html','w').write(src.crawl(u'宇宙诞生理论',1))
    open('../temp/webpage42.html','w').write(src.crawl(u'宇宙诞生理论',2))
    open('../temp/webpage51.html','w').write(src.crawl(u'里约奥运会比赛项目变化',1))
    open('../temp/webpage52.html','w').write(src.crawl(u'里约奥运会比赛项目变化',2))
    open('../temp/webpage61.html','w').write(src.crawl(u'内地最新电影票房排行榜',1))
    open('../temp/webpage62.html','w').write(src.crawl(u'内地最新电影票房排行榜',2))
    open('../temp/webpage71.html','w').write(src.crawl(u'酵素的正确食用方法',1))
    open('../temp/webpage72.html','w').write(src.crawl(u'酵素的正确食用方法',2))
    open('../temp/webpage81.html','w').write(src.crawl(u'iphone6s和iphone6的区别',1))
    open('../temp/webpage82.html','w').write(src.crawl(u'iphone6s和iphone6的区别',2))
    '''
    open('../temp/webpage43.html','w').write(src.crawl(u'宇宙形成理论',1))
    #open('../temp/webpage2.html','w').write(src.crawl(u'我们的故事',2))
    #open('../temp/webpage3.html','w').write(src.crawl(u'我们的故事',3))
    #open('../temp/webpage4.html','w').write(src.crawl(u'我们的故事',4))
#open('../temp/webpage5.html','w').write(src.crawl(u'晕轮效应',5))

