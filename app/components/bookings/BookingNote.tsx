"use client";

import Button from "@/app/components/common/buttons/Button";
import TextArea from "@/app/components/common/inputs/TextArea";
import React, { useState } from "react";
import { updateBookingNote } from "@/app/actions/bookings";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { withAuthCheck } from "@/app/helpers/authHelpers";

const updateBookingNoteWithAuthCheck = withAuthCheck(updateBookingNote);

const BookingNote = ({
  isPreview = false,
  value,
  bookingId,
}: {
  isPreview?: boolean;
  value?: string;
  bookingId: string;
}) => {
  const [note, setNote] = useState<string>(value || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dictionary = useDictionaryContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleNoteChange = async () => {
    setLoading(true);
    try {
      await updateBookingNoteWithAuthCheck(bookingId, note);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
    }
  };

  return isPreview ? (
    note && (
      <div className="mt-2 w-full rounded-md border border-gray-200 bg-gray-50 p-1 px-2 text-xs font-normal leading-4">
        {note}
      </div>
    )
  ) : (
    <div className="mb-6 rounded-md border border-gray-200 bg-gray-50 px-6 py-4">
      <div className="flex items-center gap-6">
        <div className="text-base font-medium capitalize leading-6">
          {dictionary.bookings.yourNote}
        </div>
        {!isEditing ? (
          <Button
            title={dictionary.general.edit}
            onClick={() => setIsEditing(!isEditing)}
            iconLeft={<i className="fa-light fa-pen mr-2 text-lg" />}
            color="secondary"
          />
        ) : (
          <Button
            title={loading ? dictionary.general.save + "..." : dictionary.general.save}
            onClick={handleNoteChange}
            iconLeft={<i className="fa-light fa-save mr-2 text-lg" />}
            color="primary"
            disabled={loading}
          />
        )}
      </div>
      {isEditing ? (
        <TextArea
          name=""
          rows={1}
          placeholder={dictionary.bookings.leaveAnInternalNote}
          value={note}
          onChange={handleInputChange}
        />
      ) : (
        <div className="mt-3 flex">
          <p className="text-sm text-gray-500">{note || dictionary.bookings.leaveAnInternalNote}</p>
        </div>
      )}
    </div>
  );
};

export default BookingNote;
