interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md'
}

export function StarRating({ rating, reviewCount, size = 'md' }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating)
    const half = !filled && i < rating
    return { filled, half }
  })

  const starSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((star, i) => (
          <span
            key={i}
            className={`${starSize} ${star.filled ? 'text-[#FF9900]' : star.half ? 'text-[#FF9900]' : 'text-gray-300'}`}
          >
            {star.filled ? '★' : star.half ? '⯨' : '☆'}
          </span>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className={`${starSize} text-[#007185] hover:text-[#C7511F] cursor-pointer`}>
          {reviewCount.toLocaleString()}
        </span>
      )}
    </div>
  )
}
