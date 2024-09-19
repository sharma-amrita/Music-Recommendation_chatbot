import speech_recognition as sr
import pyttsx3
import pywhatkit
import tkinter as tk

listener = sr.Recognizer()
player = pyttsx3.init()

def listen():
    with sr.Microphone() as source:
        label.config(text="Heyy I am Jenny...")
        root.update()
        voice_content = listener.listen(source)
        text_command = listener.recognize_google(voice_content)
        entry.delete(0, tk.END) # clear the entry widget
        entry.insert(0, text_command) # update the entry widget with the text command
        print(text_command)
    return text_command.lower()

def talk(text):
    player.say(text)
    player.runAndWait()

def play_music():
    command = listen()
    if 'play' in command:
        song = command.replace('play', '')
        pywhatkit.playonyt(song)

root = tk.Tk()
root.title('Jenny Voicebot')
root.geometry('400x250')

label = tk.Label(root, text='', font=('Arial', 14))
label.pack(pady=10)

entry = tk.Entry(root, font=('Arial', 14))
entry.pack(pady=10)

button = tk.Button(root, text='Speak', font=('Arial', 14), command=play_music)
button.pack(pady=10)

root.mainloop()
