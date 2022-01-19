# this is the filter I made to achieve the visual effects
# on all images on the website (and my GitHub profile pic!)

import cv2

while True:
    name = input("file name > ")
    img = cv2.imread(name ,0)

    # apply canny filter with parameters 100 and 50 (you can play with this for custom style)
    edges = cv2.Canny(img,100,50)

    # invert image
    img = cv2.bitwise_not(edges)

    cv2.imshow("Edges", img)
    cv2.waitKey(0)
