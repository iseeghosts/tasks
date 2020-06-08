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
- (added) creating pre-alpha login screen ui
- (added feature) added icons for userid check and password check
- (added feature) password box won't be visible until a registered userid is entered
- (added feature) seperate prompts for incorrect userid and no userid entered
- (added feature) entering wrong or no userid and sending userid check request will not work after 5 attempts
- (added feature) feature where editing userid field after verification will hide the password field
- (added feature) feature where editing userid field after verification will also reset the password field
- (added feature) password view property where clicking on eye icon will show your password
- (fixed) submitting with out entering password worked afer logout even if password field appeared empty
- (fixed) adjustment of assets
- (added feature) entering a verified userid will display the verified userid logo
- (added feature) if an userid is verified, the check request will be disabled until further changes are made in userid field
- (added feature) a timer is run after too many unsuccessful attempts
- (added feature) disable userid input after too many unsuccessful attempts
- (added support) to show time [not countdowning live on screen though], required to be able to retry
- (initiation) logged in home page is created
- (added support) for logging in with user id and password from users.json
- (added feature) feature where userid will be passed to after login for user header
- (changed behaviour) users.json will now have name, for each will have their user id and password
- (changed behaviour) name will be passed on instead of userid
- (added support) logout function is added

## Recent Changes
- (change) user.json -> userid -> {name, passowrd}
- (added feature) email can be submitted via both keyboard and button
- (removed) back navigation button
- (added feature) dark and light theme
- (fixed) numerous issues with icon rendering in dark and light mode
- (added feature) signup page and login page share the same theme
- (added feature) keyboard will share the same theme as the app

# Home Screen
- (added feature) user header feature where clicking on profile will display option for users - (function for those aren't made yet)
- (added feature) support for flatlist using items from tasks.json
- (added feature) check items to mark them done in items list
- (added feature) support to delete items
- (added feature) support to edit the content
- (fixed) improvements in styling with proper shadows and borders
- (added feature) support to delete items
- (fixed) removed unneccessary margin from bottom
- improved look of buttons with cooler icons,
- (fixed) editing will not be visible because of being covered by keyboard
- (fixed) items will not scroll to the end
- improved editing experince - edit icon will change when in edit mode
- (fixed) tasks at the end of list could not be modified being covered by addtask button
- (added feature) an empty task in the list will have editing enabled by default (for future add task function)
- (added feature) task adding function, pressing plus icon on lower right corber will add an empty task
- (changed behaior) clicking on delete will now prompt confirmation dialog. 
- (fixed) if you delete the exisiting task content, the text will come back as placeholder
- (fixed) deleting an empty task may show it's earlier contents
- (added feature) expandable user options
- (added feature) logout button
- (changed behaviour) deleting an empty task will not ask for confirmation
- (changed bahaviour) removed behaviour where an empty task can be marked as done
- (changed behaviour) a task can't be marked as done during editing - this allowed user to bypass diable mark done for empty strings
- (changed bahaviour) a task can't be deleted during editing
- (added feature) styles based on status of task (i.e - new task, being editted task etc...)
- (changed behaviour) a new task will appear on top of list instead of bottom
- (added feature) list will scroll up to the last added task
- (added feature) a new task will have a random id to avoid same id conflicts
- (added feature) ability for newly created task to add time of last update by default
- (added feature) button added which will display details of the task
- (changed behaviour) profile option will be visible by default, View Profile has been replaced by Logout button
- (new) Logout function has been updated
- (added feature) user specific tasks
- (fixed) user specific task threw error
- (fixed) logging back in after logout will reset your new tasks to empty
- (fixed) items were still visible after delete
- (new) Usersetting page

## Recent Changes
- (removed) logout button for recycle bin option
- (new) Recycle bin for deleted items
- (new) Search Feature
- (added feature) - Footer displaying number of results
- (fixed) numerous issues with showing results
- (added support) searching in recycle bin
- (added feature) shortcuts for searching [more details](/docs/search#options-and-shortcuts-for-search)
- (added feature) searching in Recycle Bin
- (added feature) a header indicating whether user is in recycle bin or not
- (added feature) all other options will disappear when focusing on search
- (new) dark and light theme
- (added feature) different icons for dark and light theme
- (fixed) numerous issues with rendering with dark and light themes
- (added feature) option for always show search [more details](/docs/search#always-show-search-mode)

