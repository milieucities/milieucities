require 'spec_helper'

describe CustomSurveysController do
  let(:typeform_response) do
    {
      "event_id": "2cbSGSWG9y",
      "event_type": "form_response",
      "form_response": {
        "form_id": "HHlHgX",
        "token": "3dba02fd611f97715b74c4a85179064c",
        "submitted_at": "2017-02-12T19:27:24Z",
        "definition": {
          "id": "HHlHgX",
          "title": "Wakefield Spring Survey",
          "fields": [
            {
              "id": "42471745",
              "title": "How many people use the water that you collect?",
              "type": "number"
            },
            {
              "id": "42471736",
              "title": "Please tell us a bit more about how you use the spring water:",
              "type": "list"
            },
            {
              "id": "42471742",
              "title": "Do you have any safety concerns about the site of the spring, the drinkability of the water, or anything else?",
              "type": "textarea"
            },
            {
              "id": "42471744",
              "title": "In litres, can you tell us approximately how much water you collect during a visit?",
              "type": "number"
            },
            {
              "id": "42471732",
              "title": "Please tell us your first name",
              "type": "textfield"
            },
            {
              "id": "42471733",
              "title": "Please tell us your last name:",
              "type": "textfield"
            },
            {
              "id": "42471741",
              "title": "How do you think the spring fits into the history of Wakefield and the surrounding areas?",
              "type": "textarea"
            },
            {
              "id": "42471737",
              "title": "How often do you visit the Wakefield spring?",
              "type": "list"
            },
            {
              "id": "42471746",
              "title": "In years, how long have you been coming to the spring?",
              "type": "number"
            },
            {
              "id": "42471734",
              "title": "Please provide us with your postal code (ie. A1AA1A)",
              "type": "textfield"
            },
            {
              "id": "42471739",
              "title": "In your use of the spring, can you tell us about the positive aspects that you enjoy?",
              "type": "textarea"
            },
            {
              "id": "42471740",
              "title": "In your use of the spring, can you tell us about the negative aspects that you would change if you could?",
              "type": "textarea"
            },
            {
              "id": "42471735",
              "title": "Thanks {{answer_42471732}}, please provide us an email we can reach you at.",
              "type": "email"
            },
            {
              "id": "42471738",
              "title": "If there are other ways you use the spring water please tell us a bit more about it here:",
              "type": "textarea"
            },
            {
              "id": "42471743",
              "title": "As a community member, can you tell us what the spring means to you outside of being a water source?",
              "type": "textarea"
            }
          ]
        },
        "answers": [
          {
            "type": "number",
            "number": 57,
            "field": {
              "id": "42471745",
              "type": "number"
            }
          },
          {
            "type": "choices",
            "choices": {
              "labels": [
                "for water while driving"
              ]
            },
            "field": {
              "id": "42471736",
              "type": "multiple_choice"
            }
          },
          {
            "type": "text",
            "text": "sdfsdf",
            "field": {
              "id": "42471742",
              "type": "long_text"
            }
          },
          {
            "type": "number",
            "number": 234,
            "field": {
              "id": "42471744",
              "type": "number"
            }
          },
          {
            "type": "text",
            "text": "bliblie",
            "field": {
              "id": "42471732",
              "type": "short_text"
            }
          },
          {
            "type": "text",
            "text": "skdjfdk",
            "field": {
              "id": "42471733",
              "type": "short_text"
            }
          },
          {
            "type": "text",
            "text": "alsdjksldjfs",
            "field": {
              "id": "42471741",
              "type": "long_text"
            }
          },
          {
            "type": "choice",
            "choice": {
              "label": "monthly"
            },
            "field": {
              "id": "42471737",
              "type": "multiple_choice"
            }
          },
          {
            "type": "number",
            "number": 456,
            "field": {
              "id": "42471746",
              "type": "number"
            }
          },
          {
            "type": "text",
            "text": "2297",
            "field": {
              "id": "42471734",
              "type": "short_text"
            }
          },
          {
            "type": "text",
            "text": "asdfasdfasdf",
            "field": {
              "id": "42471739",
              "type": "long_text"
            }
          },
          {
            "type": "text",
            "text": "dfsdfsdfsdf",
            "field": {
              "id": "42471740",
              "type": "long_text"
            }
          },
          {
            "type": "email",
            "email": "ha@no.com",
            "field": {
              "id": "42471735",
              "type": "email"
            }
          },
          {
            "type": "text",
            "text": "adadsf",
            "field": {
              "id": "42471738",
              "type": "long_text"
            }
          },
          {
            "type": "text",
            "text": "j;ljkdf",
            "field": {
              "id": "42471743",
              "type": "long_text"
            }
          }
        ]
      }
    }
  end

  it 'should save and process survey results and return 200' do
    post :typeform, typeform_response, format: :json
    expect(response.status).to eq(200)
  end

end
