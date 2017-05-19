require 'spec_helper'
require "#{Rails.root}/app/services/url_generator.rb"

module Services
  describe UrlGenerator do
    let(:opts) do
      {
        dev_site_id: 1,
        comment_id: 2,
        email: 'test@testing.com',
        token: 'super-secure-token',
        comment: { flagged_as_offensive: Comment::APPROVED_STATUS }
      }
    end

    describe '#generate_approve_comment_url' do
      it 'should generate the correct approval url' do
        generated_url = UrlGenerator.generate_approve_comment_url(opts)

        expected_query = opts.except(:dev_site_id, :comment_id).to_query
        expected_url = "#{UrlGenerator::HOST_MAP['test']}/dev_sites/#{opts[:dev_site_id]}/comments/#{opts[:comment_id]}/approve?#{expected_query}"

        expect(generated_url).to eq(expected_url)
      end
    end

    describe '#generate_reject_comment_url' do
      it 'should generate the correct rejection url' do
        opts = {
          dev_site_id: 1,
          comment_id: 2,
          email: 'test@testing.com',
          token: 'super-secure-token',
          comment: { flagged_as_offensive: 'FLAGGED' }
        }

        generated_url = UrlGenerator.generate_reject_comment_url(opts)
        expected_query = opts.except(:dev_site_id, :comment_id, :comment).to_query
        expected_url = "#{UrlGenerator::HOST_MAP['test']}/dev_sites/#{opts[:dev_site_id]}/comments/#{opts[:comment_id]}/reject?#{expected_query}"

        expect(generated_url).to eq(expected_url)
      end
    end
  end
end
