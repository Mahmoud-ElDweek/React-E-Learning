import React, { useEffect, useState } from 'react';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from 'react-redux';
import { increment, decrement } from '../../ReduxToolkit/Slices/WishListSlice';

// eslint-disable-next-line react/prop-types
const AddToWishList = ({ CourseID }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsFavorite(wishlist.includes(CourseID));
    }, [CourseID]);

    const handleAddToWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isCourseInWishlist = wishlist.includes(CourseID);

        if (!isCourseInWishlist) {
            wishlist.push(CourseID);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            dispatch(increment());
        } else {
            const updatedWishlist = wishlist.filter((x) => x !== CourseID);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            dispatch(decrement());
        }

        setIsFavorite(!isCourseInWishlist);
    };

    return (
        <FavoriteIcon 
            onClick={handleAddToWishlist} 
            color={isFavorite ? 'error' : 'action'}
            sx={{":hover": {
                scale: "1.1"
            }}}
        />
    );
};

export default AddToWishList;
