import { Star, Quote } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card testimonial-card">
      <Quote size={26} className="testimonial-card__quote" />
      <p className="testimonial-card__feedback">&ldquo;{testimonial.feedback}&rdquo;</p>
      {testimonial.rating && (
        <div className="testimonial-card__stars" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} fill={i < testimonial.rating ? "currentColor" : "none"} />
          ))}
        </div>
      )}
      <div className="testimonial-card__client">
        <img src={testimonial.logo} alt={`${testimonial.company} logo`} loading="lazy" />
        <div>
          <strong>{testimonial.clientName}</strong>
          <span>{testimonial.designation ? `${testimonial.designation}, ` : ""}{testimonial.company}</span>
        </div>
      </div>
      <p className="testimonial-card__project">Project: {testimonial.projectCompleted}</p>
    </div>
  );
}
