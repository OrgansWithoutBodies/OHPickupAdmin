from PIL import Image, ImageDraw, ImageFont
import os

wd= os.getcwd()
imsize=[8.5,11]#inches
dpi=100
impix= [int(i*dpi) for i in imsize]


def blankPage():
	dt="Date:"
	lhskeys=["Name:","Phone:","Address:","City/Initials:"]	
	lhsgap=32
	rhskey="Items:"

	bottomtitle="No More than 6 Pick Ups"
	bottomblurb="Do Not Over Schedule Couches or Other Large \n Pieces Of Furniture on One Daily Pick Up Form \n Always Ask the Customer to spell out \n their address street name and phone # \n an entire house pick up needs to be approved and looked at \n by management before customer is given a pick up date \n write customers information on a separate piece of paper"

	LHSratio=.3
	LRratio=.9 #dividing line between LHS/RHS: <1 - RHS has more room, >1 LHS has more room
	LRpadding=100#padding on RHS & LHS from edge
	Toppadding=80

	lhsfont=ImageFont.truetype(os.path.join(wd,"ubuntu","Ubuntu-M.ttf"),20)
	rhsfont=ImageFont.truetype(os.path.join(wd,"ubuntu","Ubuntu-M.ttf"),25)
	bottomfont=ImageFont.truetype(os.path.join(wd,"ubuntu","Ubuntu-M.ttf"),30)
	numfont=ImageFont.truetype(os.path.join(wd,"ubuntu","Ubuntu-B.ttf"),40)

	page=Image.new("L",impix,"white")
	draw=ImageDraw.Draw(page)

	for p in range(6):
		TLC=(LRpadding,Toppadding+p*(len(lhskeys)*lhsgap))#TopLeftCorner of this strip
		draw.text([TLC[0]-numfont.size,TLC[1]+lhsgap],str(p+1),font=numfont)
		for l in range(len(lhskeys)):
			lpos=(TLC[0],TLC[1]+lhsgap*l)
			draw.text(lpos,lhskeys[l],font=lhsfont)
			draw.line()
		draw.line((TLC[0],TLC[1],TLC[0],len(lhskeys)*lhsgap))	
		draw.line()
	page.show()

def writePickups(tripdict):
	
	pass
blankPage()