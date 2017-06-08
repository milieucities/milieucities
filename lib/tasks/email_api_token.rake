desc "Email API token to user. Usage: rake email_api_token['username@email.com', 'Name of Organization, 'June 8, 2018']"
task :email_api_token, [:email, :organization, :expires_at] => :environment do |t, args|
  p args
  email = args.email
  org = args.organization
  expires_at = DateTime.parse(args.expires_at)

  user = User.find_by(email: email)

  if !user
    puts "There is no user with that email address"
    return
  end

  organization = Organization.find_by(name: org)

  if !organization
    puts "There is no organization with that name"
    return
  end

  token = GenerateApiToken.call(user, organization, expires_at)

  if token.success?
    ApiTokenMailer.send_api_token(user, organization, token.result, expires_at)
    puts "API token: #{token.result}"
    puts "The API token has been sent."
  else
    puts "There was an error generating the API token."
  end
end