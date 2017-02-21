require 'spec_helper'

describe CustomSurveysController do
  before do
    CustomSurvey.create(title: 'Wakefield Spring Survey', typeform_id: 'HHlHgX', form_fields: {})
  end

  let(:typeform_response) do
    {"event_id": "iXX9edNtmK","event_type": "form_response","form_response": {"form_id": "HHlHgX","token": "e62606c5ee4c5c56fd56dd8c60004e4e","submitted_at": "2017-02-21T05: 18: 14Z","definition": {"id": "HHlHgX","title": "Wakefield Spring Survey English","fields": [{"id": "42471737","title": "How often do you visit the Wakefield spring?","type": "list"},{"id": "43828341","title": "When do you use the Wakefield Spring?","type": "list"},{"id": "43395015","title": "How often do you use the Wakefield Spring?","type": "list"}]},"answers": [{"type": "choice","choice": {"label": "every 2-3 days"},"field": {"id": "42471737","type": "multiple_choice"}},{"type": "choice","choice": {"label": "year round"},"field": {"id": "43828341","type": "multiple_choice"}},{"type": "choice","choice": {"label": "seasonally"},"field": {"id": "43395015","type": "multiple_choice"}}]}}
  end

  it 'should save and process survey results and return 200' do
    post :typeform, typeform_response, format: :json
    expect(response.status).to eq(200)
  end

end
