# Preview all emails at http://localhost:3000/rails/mailers/schedule_mailer
class ScheduleMailerPreview < ActionMailer::Preview
  def send_ics
    ScheduleMailer.send_ics(Schedule.last)
  end
end
