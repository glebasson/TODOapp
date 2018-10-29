def rawdata2dict(raw):
    utf_str = raw.decode('utf-8')
    return dict(s.split('=') for s in utf_str.split('&'))