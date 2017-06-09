### REST API

## Authentication (for clients only)

**Contact us to get your API token.**

Ensure that your token is included in each request in the `HTTP_AUTHORIZATION` header.

##### POST /api/v1//dev_sites/sync

Creates or updates a dev site record for each of the dev site objects provided.

###### Parameters

The body of your request must include the following field:
- `dev_sites` (*required*): the array of objects that represent the dev sites to be added or updated.

Each dev site object should contain the following fields:
- `devID` (*required*): a unique ID or file number for the site
- `ward` (*required*): the name of the ward where the site is located
- `municipality` (*required*): the name of the municipality where the dev site is located
- `build_type` (*optional*): the building type
- `title` (*optional*): the title of the site
- `description` (*optional*): description of the site
- `ward_councillor_email` (*optional*): a valid email address for the ward councillor
- `urban_planner_name` (*optional*): the name of the planner for this site
- `urban_planner_email` (*optional*): a valid email address for the planner for this site
- `applicant` (*optional*): the name of the applicant
- `on_behalf_of` (*optional*): the name of the organization or company behind the application
- `received_date` (*optional*): the date on which the application was received in the format DD/MM/YYYY
- `active_at` (*optional*): the date on which the application is deemed complete DD/MM/YYYY
- `addresses_attributes` (*required*): an array of one object representing the address of the site
    - `street` (*required*): the street address
    - `lat` (*optional*): the latitude of the location
    - `lon` (*optional*): the longitude of the location
- `application_types_attributes` (*required*): an array of objects containing the `name` of the application types applying to this site.
- `meetings_attributes` (*optional*): an array of objects containing the meetings relevant to this site. Each meeting object should contain:
    - `meeting_type` (*required*): either `public` or `council`
    - `time` (*required*): the date and time of the meeting, in the format DD/MM/YYYY-HH:MM
    - `location` (*required*): the address for the meeting
- `statuses_attributes` (*required*): an array of objects containing:
    - `status` (*required*): name of the status of the site
    - `status_date` (*required*): the date the status became active`

### Example

```json
{
  "dev_sites": [{
    "devID": "S987Z7",
    "ward": "Ward 1",
    "municipality": "Guelph",
    "build_type": "Derelict",
    "title": "123 Fake St.",
    "description": "New subdivision on 123 Fake St.",
    "ward_councillor_email": "wardcouncillor@mailinator.com",
    "urban_planner_email": "urbanplanner@mailinator.com",
    "urban_planner_name": "Jane Planner",
    "applicant": "Awesome Applicant",
    "on_behalf_of": "Buildings & Co",
    "received_date": "June 1, 2017",
    "active_at": "June 8, 2017",
    "application_types_attributes": [{
        "name": "Site Plan Approval"
      },
      {
        "name": "Plan of Subdivision"
      }
    ],
    "meetings_attributes": [{
        "meeting_type": "public",
        "time": "Tue, 27 Jun 2017 19:15:54 +0000",
        "location": "123 Fake St."
      },
      {
        "meeting_type": "council",
        "time": "Tue, 27 Jun 2017 19:15:54 +0000",
        "location": "123 Fake St."
      }
    ],
    "statuses_attributes": [{
      "status": "Application File Pending",
      "status_date": "June 7, 2017"
    }],
    "addresses_attributes": [
      { "street": "123 Fake St" }
    ]
  }]
}
```

###### Result

Status 200 if successful or status 400 if unsuccessful.


## No authentication necessary

##### GET /dev_sites

Returns a collections of development sites, ordered by ward number.

###### Parameters

- **limit** (*optional*): The limit of development site you want returned. Default is 20 if the **page** is set.
- **page** (*optional*): The page number of development site. Default is 0 if the **limit** is set.

*Note: if limit and page are both bot provided then all development sites are returned.*

###### Result

Array of development sites. *Check out the result of /dev_sites/:id*

##### Get /dev_sites/:id

Returns a development site.

###### Parameters

- **id** : The id of the development site.

###### Result

```json
    {
        "id":998,
        "devID":"D07-12-13-0216",
        "application_type":"Site Plan Control",
        "title":null,
        "status":"Application Approved",
        "status_date":"June 20, 2014",
        "address":"1234 Prestone Drive, Ottawa, Ontario, Canada",
        "images":[],
        "description":"New single storey addition to existing one storey brick and siding clad",
        "ward_name":"ORLEANS",
        "ward_num":1,
        "image_url":"https://maps.googleapis.com/maps/api/streetview?size=600x600&location=1234 Prestone Drive, Ottawa, Ontario, Canada&key=AIzaSyAwocEz4rtf47zDkpOvmYTM0gmFT9USPAw",
        "hearts":null,
        "updated_at":"2016-07-15 22:54:09 UTC",
        "latitude":45.479557990068,
        "longitude":-75.503323992099,
        "addresses":[
            {
                "id":1414,
                "street":"1234 Prestone Drive, Ottawa, Ontario, Canada"
            }
        ],
        "statuses":[
            {
                "id":3173,
                "status":"Comment Period in Progress",
                "status_date":"2013-12-12 00:00:00 UTC"
            },{
                "id":3174,
                "status":"Application on Hold",
                "status_date":"2014-01-21 00:00:00 UTC"
            },{
                "id":3175,
                "status":"Application Approved",
                "status_date":"2014-06-20 00:00:00 UTC"
            }
        ],
        "comments":[]
    }
```

##### GET /dev_sites/:id/images

Returns an array of images that have uploaded via Milieu.

###### Parameters

- **id** : The id of the development site.

##### Result

```json
    {
        "images":
            [
                {
                    "src":"https://milieu.s3.amazonaws.com/images/dev_site/images/1390/books-alot-of-books-dark.jpg",
                    "w":2560,
                    "h":1440
                },{
                    "src":"https://milieu.s3.amazonaws.com/images/dev_site/images/1390/books-alot-of-books.jpg",
                    "w":2560,
                    "h":1440
                },{
                    "src":"https://milieu.s3.amazonaws.com/images/dev_site/images/1390/clearmountains.jpg",
                    "w":2880,
                    "h":1800
                }
            ]
    }
```

##### GET /events

Returns a collections of events.

###### Parameters

- **limit** (*optional*): The limit of events you want returned. Default is 20 if the **page** is set.
- **page** (*optional*): The page number of events. Default is 0 if the **limit** is set.

*Note: if limit and page are both not provided then all events are returned.*

###### Result

Array of events. *Check out the result of /dev_sites/:id*

##### Get /events/:id

Returns a event.

###### Parameters

- **id** : The id if the event.

###### Result

```json

{
    "id":11,
    "title":"Armstrong Street Area Consultation Walkabout",
    "description":"The public is invited to join Councillor Jeff Leiper...",
    "time":"10:00am-12:00pm",
    "date":"2016-06-25",
    "images_cache":null,
    "location":"294 Carruthers Ave, Ottawa, ON K1Y 2Y8",
    "contact_email":"john.thomson@ottawa.ca",
    "contact_tel":" 6135802424 ex 28884",
    "image_url":"https://milieu.s3.amazonaws.com/images/event/images/11/web_Armstrong_-_possible_cover_2.JPG",
    "longitude":-75.7271582,
    "latitude":45.4028173
}

```
