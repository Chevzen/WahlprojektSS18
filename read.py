#!/usr/bin/env python
# -*- coding: utf-8 -*-



# DER FOLGENDE CODE DIENT NUR ALS IDEE/ANSATZ

import arrow

from ics import Calendar, Event
from urllib2 import urlopen

# Die Raumpläne die runtergeladen wurden

url = 'file://' + '/home/dinh/Dropbox/SS2018/Wahlprojekt/plans_ai_2017_sem2.ics' 
url1 = 'file://' + '/home/dinh/Dropbox/SS2018/Wahlprojekt/plans_ai_2010_sem2.ics' 

c = Calendar(urlopen(url).read().decode('iso-8859-1'))
c1 = Calendar(urlopen(url1).read().decode('iso-8859-1'))

# Die Raumpläne werden in eine Liste gepackt

plans = [c, c1]

count = 0
for x in plans:
	plans[count] = list(x.events)
	count += 1

# Eine Liste der verfügbaren Räume

c_rooms = ['UDE-C001', 'UDE-C035', 'UDE-C037', 'UDE-C007', 'UDE-C313', 'UDE-C317']

print "Räume verfügbar:"
print "-----------------"
print c_rooms

print "------------------"

# Ein Zeit-Objekt um zu vergleichen welche Veranstaltungen in diesem Zeitslot stattfinden

tz = 'Europe/Berlin'
d1 = arrow.get('2018-04-10 08:15:00 DE', 'YYYY-MM-DD HH:mm:ss').replace(tzinfo=tz)
result = []

# Zunächst werden alle Veranstaltungen in einem Zeitslot raus gefiltert

for x in plans:
	for y in x:
		if y.begin == d1:
			result.append(y)

# Dann werden die Räume raus gefiltert wo was statt findet in dem Zeitslot

for x in plans:
	for y in x:
		if y.location in c_rooms :
			c_rooms.remove(y.location)

print "-------------------------"
print "Räume frei von 8:15-9:45"
print "-------------------------"
print c_rooms


