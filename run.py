from server import app
from settings import debug
app.debug = debug
app.run(host='0.0.0.0')
