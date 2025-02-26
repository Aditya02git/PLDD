import React from 'react'

const Testimonials = () => {
  return (
    <>
          {/* Testimonials Section */}
          <section className="bg-white  testimonials dark:bg-slate-800">
        <h2 className='pb-[50px] text-4xl font-bold text-black dark:text-white'>Current Affairs</h2>
        <div className="testimonials-grid text-black dark:text-black">
          <div className="testimonial rounded-md">
            <blockquote>
              "Mysterious poultry disease kills 2,500 in Telangana. Should you be worried?"
            </blockquote>
            <a className="font-bold" href="https://www.business-standard.com/india-news/telangana-poultry-disease-outbreak-konnur-chicken-deaths-125022100803_1.html" target="_blank" rel="noopener noreferrer">
        Show Details
      </a>
          </div>
          <div className="testimonial rounded-md">
            {/* Use a valid image path or placeholder */}
            <blockquote>
              "Multi-institutional team tracks virus behind India’s lumpy skin cattle disease"
            </blockquote>
            <a className="font-bold" href="https://indianexpress.com/article/india/lumpy-skin-cattle-disease-india-multi-institutional-team-9248981/" target="_blank" rel="noopener noreferrer">
        Show Details
      </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonials
