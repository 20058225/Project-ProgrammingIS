##
# Author: Brenda Lopes | 20058225
### Programme:	2425_TMD1
### Module Lecturer (s):	 Paul Laird
### Module Title: Programming for Information Systems
###   
## -
# Project -  Programming for Information Systems. 

* Name: PubPal Systems
* Focus: Bar drinks sales system
  
Cash Register Software focuses on pub service, serving beverages and snacks/meals.  
Users can create/edit/delete users, items, and purchases.  
Users can create an order by inserting one or more items and taking payment (the option to add a type of payment).  
An order receipt is available after each purchase, and a report of the items sold is available. 

## Prepare Environment Manually
* _Both shell files contain the necessary libraries to make it work:_  
run ```bash env.sh``` to prepare the machine to PubPal Systems.  
run  ```bash test.sh``` to test the codes.  

## Prepare Environment with GitHub PipeLine
* _Make sure of your IP and ssh key is created and informed on the files and on the GitHub:_    
To create the variables USER and SSH_KEY ```Access your Repository >> Settings >> Secrets and variables.``` 
Now, adjust the ```deploy.yml``` file located in the ```.github/workflows``` folder, informing the public IP  of the machine that will receive the system.

## Implemented
* Portal    
[x] Header with scroll   
[x] Footer with privacy policy | links to social media  
[x] Input password with an icon Show/Hide   
[x] The Button goes to top     
[x] Chat    
[x] Windows with a timer    
[x] Modal   
[x] Snackbar  
[x] Function login (check login|password)   
[x] Function register (create|edit|delete)    
  
* POS   
[x] Querying JSON as a database for Products and Orders   
[x] Querying JSON to Mysql database for Users
[x] Filter for category  
[x] Buttons move up and down on selected products  
[x] Delete item button in order products      
[x] Amount due being calculated (addition and subtraction)  
[x] Button Systems provides administrator access  
[x] Filter by category showing product configuration colors     
[x] Receipt download *.txt   
[x] List of Receipt 

* Local infrastructure  
[x] The env.sh file creates an environment in which to run the project.   
[x] The test.sh file creates an environment to run the tests on the project.    
[x] The deploy.yml file is a pipeline to deploy the project from GitHub on VM Azure.    
[x] Files referring to products and orders are created inside the data folder.   
[x] Necessary libraries are being automatically installed.    
[x] File .gitignore controls which file won't go to the git repository to avoid the exposition of sensible information. 

## In process
[ ] Button Commum Items  
[ ] Exhibit map of tables    
[ ] Exhibit tables by colors (busy | available)   
[ ] Grouping products   
[ ] Print receipt pdf   
[ ] Login to POS separade and using only ID and a new short password.   