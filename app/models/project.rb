class Project < ActiveRecord::Base
  attr_accessor :images, :files

  # Associations
  has_many :comments, as: :commentable, dependent: :destroy

  # Voting
  acts_as_votable

  # Validations
  validates     :title, presence: { message: "A project title is required" }
  validates     :description, presence: { message: "A project description is required" }
  validates     :funds_raised, numericality: true
  validates     :funding_goal, presence: { message: "Funding goal is required" }, numericality: true

  # CarrierWave - Images
  mount_uploaders :images, ImagesUploader

  # CarrierWave - Files
  mount_uploaders :files, FilesUploader
end
