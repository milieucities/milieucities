module Services
  module DataAnalysis
    def overall_sentiments(comments)
      results = {
        totals: {},
        averages: {}
      }
      count = comments.count

      Sentiment::NAMES.each do |s_name|
        sentiment_total = sum_of_comments_sentiment(comments, s_name)
        sentiment_average = sentiment_total / count

        results[:totals][s_name] = sentiment_total
        results[:averages][s_name] = sentiment_average
      end

      results
    end

    def sum_of_comments_sentiment(comments, s_name)
      comments.inject(0.0) do |acc, elem|
        raise StandardError, 'Comment must have associated Sentiment' unless elem.sentiment
        acc + elem.sentiment.send(s_name)
      end
    end
  end
end
