require 'watson'

class Sentiment < ActiveRecord::Base
  belongs_to :sentimentable, polymorphic: true

  NAMES = [:anger, :joy, :fear, :sadness, :disgust].freeze
end
