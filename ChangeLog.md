## Implementing consistency across all function
```
-----------------------------------------
All export function as AbCd              
All functions to be used in form of ab_cd
All long variables in format of abCd     
All function imports in format of AbCd   
All image file imports as Ab_Cd          
All file (- images) imports as Abcd      
All style elements as abcd                
All short variables as abcd              
-----------------------------------------
```

# Main Login Box
- added shadows,
- added email box
- added feature where passowrd box won't be visible until a registered email is entered
- added seperate prompts for incorrect email and no email is entered.
- added feature where entering wrong or no email and sending email check request will not work after 5 attempts.
- added feature where editing email field after verification will hide the password field
- (fix) added feature where editing email field after verification will also reset the password field.
- added password view property where clicking on view will show your password.
- (fix) fized issue where old entered password remained even when password entry field appeared empty.
- adjustment of logos
- added feature where entering a verified email will display the verified email logo
- added feature where if an email is verified, the check request will be disbaled until further changes are made in email field.
- added timer properties, where a timer is run after unsuccessful too many attempts
- added disable support to email after too many unsuccessful attempts
- added support to show time [not countdowning live on screen though], required to be able to retry.
- logged in home page is created
- added support for logging in with user id and password from users.json
- added feature where userid will be passed to after login for user header
- improved experience where users.json will now have name, for each will have their user id and password, name will be passed on instead of userid
- logout function is added 

# Home Screen
- added user header feature where clicking on profile will display option for users - (function for those aren't made yet)
- added support for flatlist using items from tasks.json
- added check items to mark them done in items list
- added support to delete items
- added support to edit the content
- (fix) improvements in styling with proper shadows and borders
- added support to delete items
- (fix) removed unneccessary margin from bottom
- improved look of buttons with cooler icons,
- fixed feature where editing will not be visible because of being covered by keyboard
- fixed feature where items will not scroll to the end
- improved editing experince - edit icon will change when in edit mode
- (fix) added some more empty space at the end to fix issue where certain notes could be edited as buttons being covered by addnote button
- added feature where an empty task in the list will have editing enabled by default (for future add note function)
- added note adding function, pressing plus icon on lower right corber will add an empty task
- improvements - clicking on delete will now prompt confirmation dialog. 
- (fix) - fixed an issue where during editing a task if you delete the exisiting text, the text will come back as placeholder
- (fix) - fixed issue where deleting an empty task (only the empty task created by erasing preexisting value) still show confirmation dialog with task detail showing it's original value
- (changed behaviour) deleting an empty task will not ask for confirmation
- (changed bahaviour) removed behaviour where an empty task can be marked as done
- (fix) removed bahavious where a task could be marked as done during editing - this allowed user to bypass diable mark done for empty strings
- (changed bahaviour) removed bahviour where a task could be deleted during editing
- added styles based on status of task (i.e - new task, being editted task etc...)
- (changed behaviour) a new task will appear on top of list instead of bottom, and added feature where list will scroll up to the last added task
- added feature - a new task will have a random id to avoid same id conflicts
- added feature - ability for newly created task to add time of last update by default
- added feature - button added which will display details of the task
- changed behaviour - profile option will be visible by default, View Profile has been replaced by Logout button
- Logout function has been updated
- added feature - user specific tasks
- (fix) fixed issue where user specific task threw error
- (fix) fixed issue where logging back in after log out will reset your new tasks to empty
- 
