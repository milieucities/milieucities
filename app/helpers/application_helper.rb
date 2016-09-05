module ApplicationHelper

  def markdown(text)
    md = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, space_after_headers: false, hard_wrap: true, filter_html: true)
    md.render(text).html_safe
  end

  def title(page_title)
    content_for(:title) { page_title }
  end

  def avatar(user, options={})
    if user.profile.blank? || user.profile.avatar.blank?
      image_tag "default-avatar.png", class: "#{options[:html_class]}"
    else
      image_tag user.profile.avatar.web.thumb, class: "#{options[:html_class]}"
    end
  end

end
