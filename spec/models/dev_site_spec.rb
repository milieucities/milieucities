require 'spec_helper'

describe DevSite do
  before { @dev_site = FactoryGirl.build(:dev_site) }

  subject { @dev_site }

  it { should respond_to(:devID) }
  it { should respond_to(:application_type) }
  it { should respond_to(:description) }
  it { should respond_to(:ward_name) }
  it { should respond_to(:ward_num) }

  it { should respond_to(:comments) }
  it { should respond_to(:addresses) }
  it { should respond_to(:statuses) }
  it { should respond_to(:city_files) }

  it { should respond_to(:files) }
  it { should respond_to(:images) }

  it { should be_valid }

  describe '#update_sentiment' do
    let(:sentiment1) { FactoryGirl.create(:sentiment) }
    let(:sentiment2) { FactoryGirl.create(:sentiment) }
    let(:comment1) { FactoryGirl.create(:comment, sentiment: sentiment1) }
    let(:comment2) { FactoryGirl.create(:comment, sentiment: sentiment2) }
    let(:dev_site_with_comments) { FactoryGirl.create(:dev_site) }

    before do
      dev_site_with_comments.comments << comment1
      dev_site_with_comments.comments << comment2
    end

    context 'dev site does not have a sentiment associated' do
      it 'should create a sentiment on the dev site' do
        expect(dev_site_with_comments.sentiment).to be_nil

        dev_site_with_comments.update_sentiment

        expect(dev_site_with_comments.sentiment).to_not be_nil
      end
    end

    context 'dev site has a sentiment associated' do
      before :each do
        dev_site_with_comments.update_sentiment
      end

      it 'should update sentiment totals' do
        Sentiment::NAMES.each do |s_name|
          sentiment_total_method = "#{s_name}_total".to_sym
          dev_site_total = dev_site_with_comments.send(sentiment_total_method)
          expected_total = [sentiment1.send(s_name), sentiment2.send(s_name)].sum

          expect(dev_site_total).to eq(expected_total)
        end
      end

      it 'should create a sentiment and update its averages' do
        Sentiment::NAMES.each do |s_name|
          sentiments = [sentiment1, sentiment2]
          sum = sentiments.map { |s| s.send(s_name) }.sum
          count = sentiments.length
          expected_average = sum / count
          average = dev_site_with_comments.sentiment.send(s_name)

          expect(average).to eq(expected_average)
        end
      end
    end
  end

  describe '#search' do
    before :each do
      @dev_site1 = FactoryGirl.create(:dev_site)
      @dev_site2 = FactoryGirl.create(:dev_site)
      @dev_site3 = FactoryGirl.create(:dev_site)
      @dev_site4 = FactoryGirl.create(:dev_site)

      @dev_site_1.addresses << FactoryGirl.create(:address)
    end

    context 'no params passed' do
      it 'should retrieve all DevSites' do
        search_params = {}

        result = DevSite.search(search_params)

        expect(result.count).to eq(4)
        expect(result).to include(@dev_site1)
        expect(result).to include(@dev_site2)
        expect(result).to include(@dev_site3)
        expect(result).to include(@dev_site4)
      end
    end

    context 'location search params passed' do
      it 'should retrieve sites closest sites' do
        search_params = { latitude: 45.430863, longitude: -75.712344 }

        result = DevSite.search(search_params)

        expect(result).to eq([@dev_site1])
      end
    end
  end
end
