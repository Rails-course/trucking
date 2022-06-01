module Concerns::Paginatable
  def offset_value
    if params[:page].to_i <= 1
      0
    else
      (params[:page].to_i - 1) * default_page_size
    end
  end

  def default_page_size
    params[:per_page].to_i.negative? ? 5 : params[:per_page].to_i
  end

  def paginate_collection(collection)
    collection.offset(offset_value).limit(default_page_size)
  end
end

