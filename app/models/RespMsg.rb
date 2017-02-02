require 'json'

class RespMsg

  def initialize(code, description)
    @code = code
    @description = description
  end

  def to_json
    {'code' => @code, 'description' => @description}.to_json
  end
end
