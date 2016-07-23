module ApplicationHelper

  def markdown(text)
    md = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, space_after_headers: false, hard_wrap: true, filter_html: true)
    md.render(text).html_safe
  end

  def title(page_title)
    content_for(:title) { page_title }
  end

end
