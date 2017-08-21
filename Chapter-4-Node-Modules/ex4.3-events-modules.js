var Person = require('./libs/Person');

var man = new Person('A man');

man.emit('wants', 'GoPro5 Hero Black');
man.emit('wants', 'Electric Guitar');
man.emit('wants', 'More Money $$');
man.emit('wants', 'Happiness');
man.emit('wants', 'New Mobile');
man.emit('wants', 'A Flat');