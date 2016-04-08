# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

<<<<<<< HEAD
ActiveRecord::Schema.define(version: 20160408004149) do
=======
ActiveRecord::Schema.define(version: 20160401041601) do
>>>>>>> f13435781105d3600de43f76a50ebe09054e5dde

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.float    "lat"
    t.float    "lon"
    t.string   "street"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "dev_site_id"
    t.float    "geocode_lat"
    t.float    "geocode_lon"
  end

  create_table "average_caches", force: :cascade do |t|
    t.integer  "rater_id"
    t.integer  "rateable_id"
    t.string   "rateable_type"
    t.float    "avg",           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

<<<<<<< HEAD
=======
  create_table "city_files", force: :cascade do |t|
    t.string   "name"
    t.string   "link"
    t.datetime "orig_created"
    t.datetime "orig_update"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "dev_site_id"
  end

>>>>>>> f13435781105d3600de43f76a50ebe09054e5dde
  create_table "comments", force: :cascade do |t|
    t.text     "body"
    t.integer  "dev_site_id"
    t.string   "title"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "user_id"
    t.string   "commentable_type"
    t.integer  "commentable_id"
  end

  add_index "comments", ["dev_site_id"], name: "index_comments_on_dev_site_id", using: :btree

<<<<<<< HEAD
=======
  create_table "councillors", force: :cascade do |t|
    t.integer  "ward_num"
    t.string   "ward_name"
    t.string   "office"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "link"
    t.string   "photo_link"
    t.string   "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

>>>>>>> f13435781105d3600de43f76a50ebe09054e5dde
  create_table "demos", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dev_sites", force: :cascade do |t|
    t.string   "devID"
    t.string   "application_type"
    t.string   "title"
    t.text     "description"
    t.string   "ward_name"
    t.integer  "ward_num"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "appID"
    t.datetime "received_date"
    t.datetime "updated"
    t.string   "image_url"
    t.integer  "hearts"
    t.json     "files"
    t.json     "images"
<<<<<<< HEAD
    t.string   "build_type"
=======
>>>>>>> f13435781105d3600de43f76a50ebe09054e5dde
  end

  create_table "events", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "time"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "overall_averages", force: :cascade do |t|
    t.integer  "rateable_id"
    t.string   "rateable_type"
    t.float    "overall_avg",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rates", force: :cascade do |t|
    t.integer  "rater_id"
    t.integer  "rateable_id"
    t.string   "rateable_type"
    t.float    "stars",         null: false
    t.string   "dimension"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rates", ["rateable_id", "rateable_type"], name: "index_rates_on_rateable_id_and_rateable_type", using: :btree
  add_index "rates", ["rater_id"], name: "index_rates_on_rater_id", using: :btree

  create_table "rating_caches", force: :cascade do |t|
    t.integer  "cacheable_id"
    t.string   "cacheable_type"
    t.float    "avg",            null: false
    t.integer  "qty",            null: false
    t.string   "dimension"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rating_caches", ["cacheable_id", "cacheable_type"], name: "index_rating_caches_on_cacheable_id_and_cacheable_type", using: :btree

  create_table "statuses", force: :cascade do |t|
    t.datetime "status_date"
    t.string   "status"
    t.datetime "created"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "dev_site_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.string   "email"
    t.string   "role"
    t.text     "bio"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
    t.string   "api_key"
  end

  add_foreign_key "comments", "dev_sites"
end
