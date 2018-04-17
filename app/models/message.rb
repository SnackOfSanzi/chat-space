class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  mount_uploader :image, ImageUploader
  validates :body_or_image, presence: true

  def time_formats
    Time.now.to_s(:datetime)
  end

  private

  def body_or_image
   body.presence or image.presence
 end
end
