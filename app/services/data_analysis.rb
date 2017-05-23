module Services
  module DataAnalysis
    def overall_sentiments(comments)
      results = {
        totals: {},
        averages: {}
      }

      eligible_comments = comments.select { |comment| comment.sentiment.present? }
      count = eligible_comments.count

      Sentiment::NAMES.each do |s_name|
        sentiment_total = sum_of_comments_sentiment(eligible_comments, s_name)
        sentiment_average = sentiment_total / count

        results[:totals][s_name] = sentiment_total
        results[:averages][s_name] = sentiment_average
      end

      results
    end

    def sum_of_comments_sentiment(comments, s_name)
      comments.inject(0.0) do |acc, elem|
        elem.sentiment.present? ? acc + elem.sentiment.send(s_name) : acc + 0
      end
    end
  end
end
