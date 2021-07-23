class ScheduleMailer < ApplicationMailer
  def send_ics(schedule)
    # Bless you, Mauro
    # https://stackoverflow.com/a/40407600
    @cal = Icalendar::Calendar.new
    @cal.event do |e|
      e.dtstart = Icalendar::Values::DateTime.new(schedule.start)
      e.dtend = Icalendar::Values::DateTime.new(schedule.end)
      e.summary = schedule.title
      e.description = schedule.body
      # TODO: Add Chile regions to a database and query from the commune name
      # e.location = schedule.location
    end
    mail.attachments["calendar_event.ics"] = { mime_type: 'text/calendar', content: @cal.to_ical }
    emails = schedule.attendees.map { |a| a.email }
    mail(to: emails, subject: "#{schedule.title}")
  end
end
